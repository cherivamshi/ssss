import { Box } from "@mui/material";

const SectionTitle = ({ title }) => (
  <Box
    sx={{
      bgcolor: 'green',
      color: 'white',
      px: 2,
      py: 1,
      fontWeight: 'bold',
      width: '60%',
      fontSize: '1rem',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
        borderBottomRightRadius: 40,
    }}
  >
    {title}
  </Box>
);
export default SectionTitle;