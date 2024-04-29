import Link from "next/link";

export default function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-2 text-6xl font-bold text-primary">GPTGenius</h1>
          <p className="mb-2 py-6 text-lg leading-loose">
            GPTGenius is a web app that allows users to chat with OpenAI&apos;s GPT-4.
          </p>
          <Link href='/chat' className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
}
