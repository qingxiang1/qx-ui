import type { Meta, StoryObj } from '@storybook/react';
import Calendar from '../components/Calendar/index';
import type { CalendarProps } from '../components/Calendar/index';
import dayjs from 'dayjs';

const meta = {
  title: '日历组件',
  component: Calendar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date'
    }
  }
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderCalendar = (args: CalendarProps) => {
  if(typeof args.value === 'number') {
      return <Calendar {...args} value={dayjs(new Date(args.value))}/>
  }

  return <Calendar {...args}/>
}

export const Value: Story = {
  args: {
    value: dayjs('2024-12-24')
  },
  render: renderCalendar,
};

export const DateRender: Story = {
  args: {
    value: dayjs('2024-12-24'),
    dateRender(currentDate) {
      return <div>
        日期{currentDate.date()}
      </div>
    }
  },
  render: renderCalendar,
};

export const DateInnerContent: Story = {
  args: {
    value: dayjs('2024-12-24'),
    dateInnerContent(currentDate) {
      return <div>
        日期{currentDate.date()}
      </div>
    }
  },
};

export const Locale: Story = {
  args: {
    value: dayjs('2023-11-08'),
    locale: 'en-US'
  },
};