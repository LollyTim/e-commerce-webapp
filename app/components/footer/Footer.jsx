import Link from "next/link";
import Container from "../Container";
import FooterLIst from "./FooterLIst";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className=" bg-blue-600 text-slate-100 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-14 pb-8">
          <FooterLIst>
            <h3 className=" text-base font-bold mb-2">Shop Categories</h3>
            <Link href={"#"}>Phone</Link>
            <Link href={"#"}>Laptop</Link>
            <Link href={"#"}>Desktops</Link>
            <Link href={"#"}>Watches</Link>
            <Link href={"#"}>Tvs</Link>
            <Link href={"#"}>Accessories</Link>
          </FooterLIst>
          <FooterLIst>
            <h3 className=" text-base font-bold mb-2">CustomerServices</h3>
            <Link href={"#"}>Contact us</Link>
            <Link href={"#"}>Shipping Policy</Link>
            <Link href={"#"}>Return & Exchange</Link>
            <Link href={"#"}>FAQs</Link>
          </FooterLIst>
          <div className=" w-full md:w-1/3 mb-6 md:mb-0 ">
            <h3 className=" text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              As an electronic store we are decicated to providing the latest
              and greatest devices and accessories to our customers. With a wide
              selection of phones, Tvs, laptops,Watches, and accessories
            </p>
            <p>
              &copy;{new Date().getFullYear()} Gadg-Store. All right reserved
            </p>
          </div>
          <FooterLIst>
            <h3 className=" text-base font-bold mb-2">Follow Us</h3>
            <div className=" flex gap-2">
              <Link href={"#"}>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href={"#"}>
                <MdFacebook size={24} />
              </Link>
              <Link href={"#"}>
                <AiFillInstagram size={24} />
              </Link>
              <Link href={"#"}>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterLIst>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
