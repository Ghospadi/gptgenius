import Link from "next/link";

const NavLinks = ({links}) => {
  return (
    <div className="mt-8">
      <ul className="menu text-base-content">
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.href} passHref className="capitalize">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
