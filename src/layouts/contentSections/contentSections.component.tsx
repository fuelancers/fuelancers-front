import React from 'react';

interface IProps {
    label: string;
    styles: string;
    rounded?: boolean;
    children: React.ReactNode;
}

function ContentSections({ label, styles, rounded, children }: IProps) {
    return (
        <section
            className={`py-20 md:py-20 px-4 md:px-8 relative overflow-hidden ${styles} ${rounded ? 'rounded-tr-5xl rounded-bl-5xl' : ''
                } `}
        >
            <div className="content-sections">
                <div className="title mb-10">
                    <h4 className="text-center text-xl md:text-2xl font-bold">{label}</h4>
                </div>
                <div className="body">{children}</div>
            </div>
        </section>
    );
}

export default ContentSections;
