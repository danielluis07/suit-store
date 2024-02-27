"use client";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="max-w-[1400px] mx-auto xl:p-20 md-10 sm:px-2 px-4 bg-milky">
      {children}
    </div>
  );
};
