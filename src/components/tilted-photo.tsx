import Image from "next/image";

type BlockColour = "green" | "yellow" | "red" | "blue";

const blockClasses: Record<BlockColour, string> = {
  green: "bg-green-30t",
  yellow: "bg-yellow-30t",
  red: "bg-red-30t",
  blue: "bg-blue-30t",
};

// A photo tilted a couple of degrees with a brand-colour block rotated the
// other way behind it, so a sliver of colour shows on two edges. Gives the
// imagery a hand-placed feel without resorting to decorative clutter.
//
// On hover the photo settles to level and lifts very slightly, like picking
// a printed photo up off a desk — decorative rather than implying a link,
// since none of these wrap navigation.
export function TiltedPhoto({
  src,
  alt,
  block = "green",
  tilt = "left",
  reveal = "full",
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 34rem, 92vw",
  priority = false,
  className = "",
  ...rest
}: {
  src: string;
  alt: string;
  block?: BlockColour;
  tilt?: "left" | "right";
  /** "subtle" halves the rotation, so less of the colour block peeks out
   *  from behind the photo — for a tighter portrait crop like a bio page,
   *  where the full tilt reads as too much loose colour around the image. */
  reveal?: "full" | "subtle";
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
} & Record<`data-${string}`, string | undefined>) {
  const suffix = reveal === "subtle" ? "s" : "";
  const front = tilt === "left" ? `tilt-${suffix}l` : `tilt-${suffix}r`;
  const behind = tilt === "left" ? `tilt-${suffix}r` : `tilt-${suffix}l`;

  return (
    <div className={`group stack-behind ${aspect} w-full ${className}`} {...rest}>
      <div
        aria-hidden
        className={`stack-block rounded-sm ${blockClasses[block]} ${behind}`}
      />
      <div
        className={`stack-front ${aspect} w-full overflow-hidden rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-xl ${front}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
