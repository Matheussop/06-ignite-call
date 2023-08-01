import { Box, Text, styled } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const ProfileAvatar = styled(Box, {
  border: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 0,
  gap: '$4',
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
