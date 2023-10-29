
export default function NavBar() {
    return (
        <div className="sidebar w-full bg-white py-4 px-6 shadow-box sticky top-0 z-20 lg:hidden">
            <ul className="list-none p-0 flex gap-4 md:gap-6 items-center justify-center">
                <li>
                    <a href="#about">
                        <img
                            src="/assets/icons/user-icon.svg"
                            width={20}
                            height={20}
                            alt="user icon"
                            className="md:w-7 md:h-7"
                        />
                    </a>
                </li>
                <li className="text-text-50 text-lg">|</li>
                <li>
                    <a href="#degrees">
                        <img
                            src="/assets/icons/degree-icon.svg"
                            width={20}
                            height={20}
                            alt="user icon"
                            className="md:w-7 md:h-7"
                        />
                    </a>
                </li>
                <li className="text-text-50  text-lg">|</li>

                <li>
                    <a href="#services">
                        <img
                            src="/assets/icons/services-icon.svg"
                            width={20}
                            height={20}
                            alt="user icon"
                            className="md:w-7 md:h-7"
                        />
                    </a>
                </li>
                <li className="text-text-50  text-lg">|</li>
                <li>
                    <a href="#languages">
                        <img
                            src="/assets/icons/language-icon.svg"
                            width={20}
                            height={20}
                            alt="user icon"
                            className="md:w-7 md:h-7"
                        />
                    </a>
                </li>
                <li className="text-text-50  text-lg">|</li>
                <li>
                    <a href="#portfolio">
                        <img
                            src="/assets/icons/portfolio.svg"
                            width={20}
                            height={20}
                            alt="user icon"
                            className="md:w-7 md:h-7"
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
}
