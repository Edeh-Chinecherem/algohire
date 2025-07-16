// import { Container } from 'react-bootstrap';
import { 
  Box, 
  Typography, 
  Link, 
  Divider, 
  Stack,
  IconButton 
} from "@mui/material";
import { 
  GitHub, 
  LinkedIn, 
  Twitter,
  Email 
} from "@mui/icons-material";
import Container from '@mui/material/Container';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <GitHub />, url: "https://github.com/algohire" },
    { icon: <LinkedIn />, url: "https://linkedin.com/company/algohire" },
    { icon: <Twitter />, url: "https://twitter.com/algohire" },
    { icon: <Email />, url: "mailto:contact@algohire.com" }
  ];

  const footerLinks = [
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Terms of Service", url: "/terms" },
    { text: "Contact Us", url: "/contact" },
    { text: "About", url: "/about" }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        px: 2,
        textAlign: "center", 
        mt: "auto", 
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider"
      }}
    >
      <Container maxWidth="lg">
        {/* Social Links */}
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center" 
          mb={2}
        >
          {socialLinks.map((item, index) => (
            <IconButton
              key={index}
              component="a"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              aria-label={item.icon.type.displayName}
            >
              {item.icon}
            </IconButton>
          ))}
        </Stack>

        {/* Footer Links */}
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={{ xs: 1, sm: 3 }} 
          justifyContent="center" 
          mb={3}
        >
          {footerLinks.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              color="text.secondary"
              underline="hover"
              variant="body2"
            >
              {item.text}
            </Link>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Copyright */}
        <Typography variant="body2" color="text.secondary">
          © {currentYear} Algohire. All rights reserved.
        </Typography>

        {/* Optional: Additional info */}
        <Typography variant="caption" color="text.disabled" display="block" mt={1}>
          Made with ❤️ for job seekers and employers
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;