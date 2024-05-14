import { FaWhatsapp } from "react-icons/fa";
import "./index.scss";

const WhatsappFloatingButton = () => {
  return (
    <a
      href="https://wa.me/34685321399"
      className="float"
      target="_blank"
    >
      <FaWhatsapp size="30px" />
    </a>
  );
};

export default WhatsappFloatingButton;
