import { FunctionComponent, ReactNode, SVGProps } from 'react';

interface MenuItemProps {
    href?: string;
    text: string;
    mobileText?: string;
    children?: ReactNode;
    icon?: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
    className?: string;
}

function MenuItem({ href, text, mobileText, icon: Icon, children, className }: MenuItemProps) {
    const content = (
        <>
            {Icon && <Icon className='w-[30px] h-[30px]' />}
            {children}
            <div className='lg:ml-2 truncate max-w-full hidden md:block'>{text}</div>
            <div className='lg:ml-2 truncate max-w-full block md:hidden'>{mobileText ?? text}</div>
        </>
    );

    const Wrapper = href ? 'a' : 'div';
    const wrapperProps = href ? { href } : {};

    return (
        <div className={`py-1 lg:pl-7 pr:1 lg:pr-3 mr-1 lg:mr-4 ${window.location.pathname === href ? "bg-pink-700 text-white rounded-r-lg" : ""} ${className ?? ""}`}>
            <Wrapper {...wrapperProps} className="flex flex-col lg:flex-row items-center px-2">
                {content}
            </Wrapper>
        </div>
    );
}

export default MenuItem;
