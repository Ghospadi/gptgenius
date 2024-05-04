"use server";
import OpenAi from "openai";
import prisma from "@/utils/db";
import {revalidatePath} from "next/cache";

const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (messages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {role: "system", content: "You are a helpful assistant."},
        ...messages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 100,
    });

    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    return null;
  }
};

export const generateTourResponse = async ({city, country}) => {
  const query = `Find a ${city} in this ${country}.
  If ${city} city in this ${country} country exists, create a list of things families can do in this ${city},${country}. 
  Once you have a list, create a one-day tour. Response should be in the following JSON format: 
  {
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "description of the city and tour",
    "stops": ["stop name", "stop name", "stop name"]
  }
}
  If you can't find info on exact city, 
  or city does not exist, or it's population is less than 1, 
  or it is not located in the following country return { "tour": null }, 
  with no additional characters.`;
  try {
    const response = await openai.chat.completions.create({
      messages: [{role: "system", content: "You are a helpful assistant."}, {role: "user", content: query}],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 250,
    });
    const tourData = JSON.parse(response.choices[0].message.content);
    if (!tourData.tour) {
      return null;
    }
    return {
      tour: tourData.tour,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistedTour = async ({city, country}) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllToursBySearchTerm = async (searchTerm) => {
  if (!searchTerm) {
    return prisma.tour.findMany({
      orderBy: {
        city: "asc",
      },
    });
  }
  return prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: "asc",
    },
  });
};

export const getSingleTourById = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};

export const fetchUserTokensById = async (clerkId) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });

  return result?.tokens;
};

export const generateUserTokensForId = async (clerkId) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
      tokens: 2500,
    },
  });

  return result?.tokens;
};

export const fetchOrGenerateTokens = async (clerkId) => {
  const tokens = await fetchUserTokensById(clerkId);
  if (tokens) {
    return tokens;
  }
  return (generateUserTokensForId(clerkId)).tokens;
};

export const subtractTokens = async (clerkId, amount) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: amount,
      },
    },
  });
  revalidatePath("/profile");
  return result?.tokens;
};
