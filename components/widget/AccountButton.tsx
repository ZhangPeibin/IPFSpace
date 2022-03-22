import { Avatar, Box, Button, DropButton, Spinner, Text } from 'grommet'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AvatarPlaceholder from "@components/widget/AvatarPlaceholder";

type DisplayAvatarProps = {
  did?: string
  label: string
  loading?: boolean
  src?: string | null
}

function DisplayAvatar({ did, label, loading, src }: DisplayAvatarProps) {
  const avatar = loading ? (
    <Box pad="xxsmall">
      <Spinner />
    </Box>
  ) : src ? (
    <Avatar style={{marginTop:"4px",marginBottom:"4px"}} size="32px" src={src} flex={false} />
  ) : (
      <div  style={{marginTop:"4px",marginBottom:"4px"}} >
          <AvatarPlaceholder   did={did} size={32} />
      </div>
  )

  return (
    <Box
      style={{paddingLeft:"16px",paddingRight:"16px",minWidth:"180px"}}
        border={{ color: '#FFD5D5' }}
      direction="row"
      gap="small"
      round="large">
      {avatar}
      <Text  alignSelf="center" size="small" truncate weight="bold">
        {label}
      </Text>
    </Box>
  )
}

type MenuButtonProps = {
  href?: string
  label: string
  loading?: boolean
  onClick?: () => void
}

function MenuButton({ label, loading, ...props }: MenuButtonProps) {
  return (
    <Button
      {...props}
      alignSelf="start"
      icon={
        loading ? (
          <Spinner size="medium" />
        ) : (
          <Box style={{ marginBottom: '2px', marginTop: '2px', marginRight: '4px' }}>
          </Box>
        )
      }
      label={
        <Text color="#1C1D1E" size='small'>
          {label}
        </Text>
      }
      plain
    />
  )
}

export default function AccountButton(props) {
  const [isMenuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // void loadDIDsData()
  }, [])

    const profile = ()=>{
        setMenuOpen(false)
        props.showProfile()
    }
    const bindWeb3Storage = ()=>{
        setMenuOpen(false)
        props._getWeb3Storage();
    }

    const content = (
        <Box border={{ color: '#fffFff' }} margin={{ top: '30px' }} round={{ size: 'small' }}>
            <Box
                align="center"
                background="#fffFff"
                gap="small"
                style={{paddingTop:"30px"}}
                round={{ corner: 'top', size: 'small' }}>
                {
                    props.icon ? (
                        <Avatar style={{marginTop:"4px",marginBottom:"4px"}} size="64px" src={props.icon} flex={false} />
                    ) : (
                        <AvatarPlaceholder did={props.idx} size={64} />
                    )
                }
                <Text size="medium" truncate>
                    {props.name.substr(0,16)}
                </Text>
            </Box>
            <Box
                background="white"
                gap="small"
                pad="small"
                round={{ corner: 'bottom', size: 'small' }}>
                <MenuButton onClick={()=>{profile()}}
                    label="Profile"
                />
                <MenuButton onClick={()=>{bindWeb3Storage()}}
                            label="Bind Web3.Storage"
                />
                <MenuButton label="Log out"  onClick={() => {props.exit()}} />
            </Box>
        </Box>
    )

    return (
        <DropButton
            style={{width:200}}
            dropAlign={{ top: 'bottom', right: 'right' }}
            dropContent={content}
            dropProps={{ plain: true }}
            onClose={() => {
                setMenuOpen(false)
            }}
            onOpen={() => {
                setMenuOpen(true)
            }}
            open={isMenuOpen}>
            <DisplayAvatar
                did={"auth.id"}
                label={props.name}
                loading={props.idxLoading}
                src={props.icon}
            />
        </DropButton>
    )
}
