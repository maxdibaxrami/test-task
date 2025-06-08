import React, { type ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { AlertBox } from '../AlertBox';
import { Button } from '../Button';
import { Typography } from '../Typography';
import { useAppDispatch, useAppSelector } from '../../hook/hooks';
import {
  selectFile,
  uploadRequested,
} from '../../features/upload/uploadSlice';
import {
  selectPreviews,
  selectCanSubmit,
  selectStatus,
  selectError,
  selectTaskId,
} from '../../features/upload/selectors';

const Grid = styled.div`
  display: grid;
  gap: 64px;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.label<{ hasFile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.neutral.surface3};
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  height: 161px;
  justify-content: center;
  text-align: center;

  input {
    display: none;
  }

  img,
  .placeholder {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.blue[50]};
    border-radius: 8px;
    z-index: 1;
  }

  img {
    object-fit: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.neutral.default};
  }
`;

const captions = [
  'Дом, дерево, человек',
  'Несуществующее животное',
  'Автопортрет',
] as const;

export const UploadStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const previews = useAppSelector(selectPreviews);
  const canSubmit = useAppSelector(selectCanSubmit);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);


  const handleSelect =
    (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) dispatch(selectFile({ index: idx, file }));
    };

  const handleSubmit = () => {
    if (!canSubmit || status === 'loading') return;
    dispatch(uploadRequested());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Typography variant="title3">
          Загрузите фотографии рисунков
        </Typography>
        <AlertBox>
          Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более 5 Мб
        </AlertBox>
      </div>

      <Grid>
        {captions.map((caption, i) => (
          <div
            key={caption}
            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
          >
            <Card hasFile={!!previews[i]}>
              <input
                type="file"
                accept="image/*"
                onChange={handleSelect(i)}
              />
              {previews[i] && <img src={previews[i]!} alt={caption} />}

              {previews[i] ? (
                <div className="placeholder">
                  {/* success icon SVG */}
                  <svg
                    width="37"
                    height="36"
                    viewBox="0 0 37 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.6539 18.048C30.6419 21.1035 29.4824 24.1545 27.1514 26.4855C22.4654 31.1715 14.8664 31.1715 10.1804 26.4855C9.34637 25.6515 8.66838 24.723 8.13137 23.739M6.67188 17.805C6.71988 14.799 7.88687 11.808 10.1804 9.5145C14.8664 4.8285 22.4654 4.8285 27.1514 9.5145C27.9854 10.3485 28.6634 11.277 29.2004 12.261M24.5954 12.2625H29.8979V6.9585M12.7364 23.7375H7.43388V29.0415"
                      stroke="#293244"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div className="placeholder">
                  {/* upload prompt SVG */}
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.8354 16.6661L19.4991 22.0023M19.4991 22.0023L14.1629 16.6661M19.4991 22.0023V5.99512M31.5041 24.6687C31.5041 27.6158 29.115 30.0049 26.1679 30.0049H12.8304C9.88325 30.0049 7.49414 27.6158 7.49414 24.6687"
                      stroke="#293244"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </Card>
            <Typography variant="description16">{caption}</Typography>
          </div>
        ))}
      </Grid>
      {error && (
        <div style={{ marginTop: '16px' }}>
          <AlertBox>{error}</AlertBox>
        </div>
      )}
    </div>
  );
};

UploadStep.displayName = 'UploadStep';
