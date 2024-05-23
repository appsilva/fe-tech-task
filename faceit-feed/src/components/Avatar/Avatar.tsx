import Image from 'next/image';

type AvatarProps = {
  src: string;
  alt: string;
};

/**
 * Avatar component to display an image with specified source and alt text using Next.js Image component.
 * @param {Object} props - The props for the Avatar component.
 * @param {string} props.src - The URL of the image source.
 * @param {string} props.alt - The alternative text for the image.
 * @returns {JSX.Element} - The Avatar component with the specified image source and alt text.
 */
export const Avatar = ({ src, alt }: AvatarProps): JSX.Element => (
  <Image src={src} alt={alt} width="150" height="150" fetchPriority="high" />
);
