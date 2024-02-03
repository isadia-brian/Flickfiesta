import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

const SliderBar = ({ className, ...props }: SliderProps) => {
  return (
    <Slider
      defaultValue={[5]}
      max={10}
      min={1}
      step={1}
      className={cn("w-[100px]", className)}
      {...props}
    />
  );
};

export default SliderBar;
