import type { FC } from "react";

import type { HeadingProps } from "../../../../validators/src";

export const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};
