import { TbMedicineSyrup } from "react-icons/tb";
import {
  GiBabyBottle,
  GiBathtub,
  GiNightSleep,
  GiFloorHatch,
  GiBabyFace,
  GiRead,
} from "react-icons/gi";
import { MdBabyChangingStation } from "react-icons/md";
import type { IconType } from "react-icons";

const icons: Record<string, IconType> = {
  TbMedicineSyrup,
  GiBabyBottle,
  GiBathtub,
  GiNightSleep,
  MdBabyChangingStation,
  GiFloorHatch,
  GiBabyFace,
  GiRead,
};

interface IconProps {
  name: keyof typeof icons;
  label: string;
}

function Icon({ name, label }: IconProps) {
  const Icon = icons[name];
  if (!Icon) {
    return <span>{label}</span>;
  }

  return <Icon aria-label={label} />;
}

export default Icon;
