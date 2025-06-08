// src/components/DatePicker.tsx
import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
} from 'react';
import type { InputHTMLAttributes } from 'react';

import styled, { css, useTheme } from 'styled-components';
import type { DefaultTheme as ThemeType } from 'styled-components';

/* ────────── Styled ────────── */
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Input = styled.input`
  padding: 0.5em 0.75em;
  border: 1px solid ${({ theme }) => theme.colors.neutral.muted};
  border-radius: 4px;
  width: 150px;
  cursor: pointer;
  transition: border-color 150ms ease;   /* smooth change */

  /* highlight on mouse-over **or** keyboard focus */
  &:hover,
  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.colors.violet[110]};
    outline: none;                       /* hide default focus ring */
  }
`;

const Popover = styled.div<{ isOpen: boolean }>`
  ${({ isOpen, theme }) => css`
    display: ${isOpen ? 'block' : 'none'};
    position: absolute;
    top: calc(100% + 0.25em);
    left: 0;
    background: ${theme.colors.neutral.surface1};
    border: 0px solid ${theme.colors.neutral.surface5};
    border-radius: 8px;
    box-shadow: 0px 32px 32px 0px #4453710D;
    box-shadow: 0px 0px 32px 0px #4453711A;
    padding: 12px;
    z-index: 10;
  `}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5em;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  line-height: 0; /* keep svg centered */
  color: ${({ theme }) => theme.colors.neutral.default};

  svg path {
    stroke: currentColor;
  }

  &:hover svg path {
    stroke: ${({ theme }) => theme.colors.blue[100]};
  }
`;


const MonthText = styled.span`
  color: ${({ theme }) => theme.colors.neutral.default};
  text-transform: capitalize;
`;

const YearText = styled.span`
  color: ${({ theme }) => theme.colors.neutral.muted};
  font-weight: 300;

`;

const MonthLabel = styled.span`
  font-weight: 700;
  display: flex;
  gap: 16px;        /* keeps a thin space between month and year */
  
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 2em);
  grid-auto-rows: 2em;
  gap: 0.25em;
  padding: 8px;
`;

const DayCell = styled.div<{
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  width:36px;
  height:36px;
  font-size:14px;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.colors.violet[110]};
      color: ${theme.colors.neutral.surface1};
    `}

  ${({ isCurrentMonth, theme }) =>
    !isCurrentMonth &&
    css`
      color: ${theme.colors.neutral.muted};
      visibility: hidden;
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.surface5};
  }
`;

const Label = styled.span<{ disabled?: boolean }>`
  font-size: 16px;
  line-height: 140%;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral.disabled : theme.colors.neutral.default};
`;


/* ────────── Utils ────────── */
const WEEK_DAYS_RU = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

function getCalendarMatrix(year: number, month: number): Date[][] {
  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = startDay;
  const totalCells = Math.ceil((prevDays + daysInMonth) / 7) * 7;

  const matrix: Date[][] = [];
  let dayCounter = 1 - prevDays;
  for (let i = 0; i < totalCells / 7; i++) {
    const week: Date[] = [];
    for (let j = 0; j < 7; j++, dayCounter++) {
      week.push(new Date(year, month, dayCounter));
    }
    matrix.push(week);
  }
  return matrix;
}

/* ────────── SVG arrows ────────── */
const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 7L10 12L15 17"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M10 17L15 12L10 7"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ────────── Component ────────── */
export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  lable?:string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, placeholder= 'Выберите дату',lable, ...rest }, ref) => {
    const theme = useTheme() as ThemeType;
    const [isOpen, setOpen] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(value ?? new Date());
    const wrapperRef = useRef<HTMLDivElement>(null);

    /* close on outside click */
    useEffect(() => {
      function handleClick(e: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    /* YYYY.MM.DD */
    const formatted = value
      ? `${value.getFullYear()}.${String(value.getMonth() + 1).padStart(2, '0')}.${String(
          value.getDate()
        ).padStart(2, '0')}`
      : '';

    const matrix = React.useMemo(
      () => getCalendarMatrix(viewDate.getFullYear(), viewDate.getMonth()),
      [viewDate]
    );

    const today = new Date();
    const handleSelect = (date: Date) => {
      onChange(date);
      setOpen(false);
    };

    const monthStr = viewDate.toLocaleString('ru-RU', { month: 'long' });
    const yearStr  = viewDate.getFullYear();


    return (
      <Wrapper ref={wrapperRef}>
        <Label>{lable}</Label>

        <Input
          ref={ref}
          readOnly
          value={formatted}
          placeholder={placeholder}
          onClick={() => setOpen(o => !o)}
          {...rest}
        />

        <Popover isOpen={isOpen}>
          <Header>
            <NavButton
              aria-label="Предыдущий месяц"
              onClick={() =>
                setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
              }
            >
              <ArrowLeft />
            </NavButton>

            <MonthLabel>
               <MonthText>{monthStr}</MonthText>
                <YearText>{yearStr}</YearText>
            </MonthLabel>

            <NavButton
              aria-label="Следующий месяц"
              onClick={() =>
                setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
              }
            >
              <ArrowRight />
            </NavButton>
          </Header>

          <Grid>
            {WEEK_DAYS_RU.map(d => (
              <div
                key={d}
                style={{
                  fontSize: '12px',
                  textAlign: 'center',
                  color: theme.colors.neutral.muted,
                  textTransform: 'uppercase',
                }}
              >
                {d}
              </div>
            ))}

            {matrix.map((week, wi) =>
              week.map((date, di) => {
                const isCurrentMonth = date.getMonth() === viewDate.getMonth();
                const isToday =
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() === today.getDate();
                const isSelected =
                  value != null &&
                  date.getFullYear() === value.getFullYear() &&
                  date.getMonth() === value.getMonth() &&
                  date.getDate() === value.getDate();

                return (
                  <DayCell
                    key={`${wi}-${di}`}
                    isCurrentMonth={isCurrentMonth}
                    isToday={isToday}
                    isSelected={isSelected}
                    onClick={() => isCurrentMonth && handleSelect(date)}
                  >
                    {date.getDate()}
                  </DayCell>
                );
              })
            )}
          </Grid>
        </Popover>
      </Wrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
