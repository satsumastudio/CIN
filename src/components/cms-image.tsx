"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { siteImage } from "@/lib/images";

type Props = Omit<ImageProps, "src"> & { src: string };

/**
 * next/image for CMS photos: serves the copy deployed with the site, and
 * falls back to Tina's CDN if that copy doesn't exist yet, e.g. a photo
 * just uploaded in the editor that hasn't been saved and deployed.
 */
export function CmsImage(props: Props) {
  // Keyed on src so a new image in the editor gets a fresh fallback state.
  return <CmsImageInner key={props.src} {...props} />;
}

function CmsImageInner({ src, alt, onError, ...rest }: Props) {
  const [failed, setFailed] = useState(false);
  const local = siteImage(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={failed ? src : local}
      onError={(event) => {
        if (!failed && local !== src) setFailed(true);
        onError?.(event);
      }}
    />
  );
}
