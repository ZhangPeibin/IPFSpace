import Avatar from 'boring-avatars'

type Props = {
  did?: string | null
  size: number | string
}

export default function AvatarPlaceholder({ did, size}: Props) {
  return (
    <Avatar
      name={did ?? 'self.id'}
      size={size}
      variant="pixel"
      colors={["#FF715E", "#FFE6DB"]}
    />
  )
}
