import { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';
import Image from './Image';

export default {
  title: 'Image',
  component: Image,
} as Meta

const Template: Story<ComponentProps<typeof Image>> = (args) => <Image {...args} />

export const Default = Template.bind({})

Default.args = {
  src: 'https://www.google.com/logos/doodles/2021/thanksgiving-2021-6753651837109145-law.gif'
}

export const Owned = Template.bind({})

Owned.args = {
  src: 'https://9to5mac.com/wp-content/uploads/sites/6/2021/09/Apple-TV.png?w=1600',
  owned: true
}
