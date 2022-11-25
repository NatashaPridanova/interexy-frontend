import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';
import './LinkButton.css';

interface LinkButtonProps {
  path: string;
  text: string;
  children?: ReactNode;
  onClickFunction?: () => void;
}

function LinkButton({ path, text, children, onClickFunction }: LinkButtonProps) {
  return (
    <Link to={path} className="link-button" onClick={onClickFunction}>
      <IconButton size="large" aria-haspopup="true" color="inherit" sx={{ p: '16px 12px' }}>
        {children}
        <Typography variant="button" sx={{ pl: 1 }}>
          {text}
        </Typography>
      </IconButton>
    </Link>
  );
}

export default LinkButton;
