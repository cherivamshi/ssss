import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import SectionTitle from '../components/cardtitles';
import { countries,states,districts } from '../components/PlaceData';
import { propertyTypeArray, propertyTypeConfig } from '../components/formData';
import {
  paperStyle,
  labelStyle,
  toggleButtonStyle,
  boxWrapperStyle,
} from '../styles/addpost';
// import TopBar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

const AddPropertyForm = () => {
  const navigate = useNavigate();

  // States
  const [listingFor, setListingFor] = useState('book');
  const [listedBy, setListedBy] = useState('owner');
  const [propertyType, setPropertyType] = useState('');
  const [paymentOption, setPaymentOption] = useState('later'); 

  const [price, setPrice] = useState('');

  const [specifications, setSpecifications] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('');
const [selectedState, setSelectedState] = useState('');
const [selectedDistrict, setSelectedDistrict] = useState('');
const [uploadedFiles, setUploadedFiles] = useState([]);
const [formError, setFormError] = useState('');


  const [amenities, setAmenities] = useState({
    RoomService: false,
    Laundry: false,
    Garden: false,
    PetCare: false,
    SmartSystems: false,
  });
  const [rules, setRules] = useState({
    Smoking: false,
    Pets: false,
    Parties: false,
  });

  // Handlers
  const handleSpecificationChange = (e) => {
    const { name, value } = e.target;
    setSpecifications((prev) => ({ ...prev, [name]: value }));
  };


  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setAmenities((prev) => ({ ...prev, [name]: checked }));
  };
  const handleSubmit = () => {
  if (
    !propertyType ||
    !price ||
    !selectedCountry ||
    !selectedState ||
    !selectedDistrict ||
    uploadedFiles.length === 0
  ) {
    setFormError('Please fill out all required fields ');
    navigate('/preview')
    return;
  }

  navigate('/preview', {
    state: {
      price,
      propertyType,
      listedBy,
      uploadedFiles,
    },
  });
};
  const handleRulesChange = (e) => {
    const { name, checked } = e.target;
    setRules((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* <TopBar showSearch={false} /> */}

      <Box sx={boxWrapperStyle}>
        <Typography variant="h5" gutterBottom>
          Add Your Property
        </Typography>

{/* listingdetails */}
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="Listing Details" />
          <Paper sx={paperStyle}>
            <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>Listing For</Typography>
            <ToggleButtonGroup
              value={listingFor}
              exclusive
              onChange={(e, val) => val && setListingFor(val)}
              fullWidth
            >
              {['book', 'rent', 'lease', 'sale'].map((type) => (
                <ToggleButton key={type} value={type} sx={toggleButtonStyle}>
                  {type}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Property Type</Typography>
              <FormControl fullWidth>
                <Select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  variant="outlined"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Property Type
                  </MenuItem>
                  {propertyTypeArray.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>Property Price</Typography>
              <TextField fullWidth type="number" variant="outlined" margin="normal" label="Price" onChange={(e) => setPrice(e.target.value)} inputProps={{ min: 0 }}/>
            </Box>
          </Paper>
        </Box>

        {/* Property Info */}
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="Property Info" />
          <Paper sx={paperStyle}>
            <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>Property Name</Typography>
            <TextField
              label=" "
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ fontWeight: 'bold' }}
            />

   {/* Country Select */}
<Box sx={{ mt: 2 }}>
  <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>Select Country</Typography>
  <FormControl fullWidth>
    <Select
      value={selectedCountry}
      onChange={(e) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setSelectedDistrict('');
      }}
      displayEmpty
      variant="outlined"
    >
      <MenuItem value="" disabled>Select Country</MenuItem>
      {countries.map((country) => (
        <MenuItem key={country} value={country}>{country}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

{/* State Select */}
<Box sx={{ mt: 2 }}>
  <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>Select State</Typography>
  <FormControl fullWidth>
    <Select
      value={selectedState}
      onChange={(e) => {
        setSelectedState(e.target.value);
        setSelectedDistrict('');
      }}
      displayEmpty
      variant="outlined"
      disabled={!selectedCountry}
    >
      <MenuItem value="" disabled>Select State</MenuItem>
      {(states[selectedCountry] || []).map((state) => (
        <MenuItem key={state} value={state}>{state}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

{/* District Select */}
<Box sx={{ mt: 2 }}>
  <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>Select District</Typography>
  <FormControl fullWidth>
    <Select
      value={selectedDistrict}
      onChange={(e) => setSelectedDistrict(e.target.value)}
      displayEmpty
      variant="outlined"
      disabled={!selectedState}
    >
      <MenuItem value="" disabled>Select District</MenuItem>
      {(districts[selectedState] || []).map((district) => (
        <MenuItem key={district} value={district}>{district}</MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>


            {[
              { label: 'Locality', name: 'locality' },
              { label: 'Landmark', name: 'landmark' },
              { label: 'Door Number', name: 'doorNumber' },
            ].map(({ label, name }) => (
              <Box key={name} sx={{ mt: 2 }}>
                <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>{label}</Typography>
                <TextField
                  label=''
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Box>
            ))}
          </Paper>
        </Box>

        
       {/* Property Media */}
<Box sx={{ mb: 3 }}>
  <SectionTitle title="Property Media" />
  <Paper sx={paperStyle}>
    <Button variant="contained" component="label">
      Upload Files
      <input
        type="file"
        hidden
        multiple
        accept="image/*" 
        onChange={(e) => {
          const files = Array.from(e.target.files);

          const imageFiles = files.filter((file) =>
            file.type.startsWith('image/')
          );

          const newFiles = imageFiles.map((file) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            size: file.size,
            type: file.type,
          }));

          setUploadedFiles((prev) => [...prev, ...newFiles]);
        }}
      />
    </Button>

    {uploadedFiles.length > 0 && (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Uploaded Files:
        </Typography>
        <ul>
          {uploadedFiles.map((f, index) => (
            <li key={index}>
              {f.name} ({(f.size / 1024).toFixed(1)} KB)
              {f.type.startsWith('image/') && (
                <Box
                  component="img"
                  src={f.preview}
                  alt={f.name}
                  sx={{ width: 100, height: 'auto', mt: 1, borderRadius: 1 }}
                />
              )}
            </li>
          ))}
        </ul>
      </Box>
    )}
  </Paper>
</Box>



        {/* Amenities */}
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="Amenities" />
          <Paper sx={paperStyle}>
            <FormGroup>
              {Object.entries(amenities).map(([key, checked]) => (
                <FormControlLabel
                  key={key}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleAmenityChange}
                      name={key}
                    />
                  }
                  label={key}
                />
              ))}
            </FormGroup>
          </Paper>
        </Box>

        {/* Check-in Rules  */}
        {listingFor === 'book' && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle title="Check in Rules" />
            <Paper sx={paperStyle}>
              <FormGroup>
                {Object.entries(rules).map(([key, checked]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleRulesChange}
                        name={key}
                      />
                    }
 label={key + ' not allowed'} 

                  />
                ))}
              </FormGroup>
            </Paper>
          </Box>
        )}

        {/* Communication */}
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="Communication" />
          <Paper sx={paperStyle}>
            <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>Listed By</Typography>
            <ToggleButtonGroup
              value={listedBy}
              exclusive
              onChange={(e, val) => val && setListedBy(val)}
              fullWidth
            >
              {['owner', 'builder', 'agent'].map((role) => (
                <ToggleButton key={role} value={role} sx={toggleButtonStyle}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {[
              { label: 'Lister Name', name: 'listerName' },
              { label: 'Lister Contact', name: 'listerContact' },
              { label: 'Lister Email', name: 'listerEmail' },
            ].map(({ label, name }) => (
              <Box key={name} sx={{ mt: 2 }}>
                <Typography sx={{ ...labelStyle, fontWeight: 'bold' }}>{label}</Typography>
                <TextField label={''} fullWidth margin="normal" variant="outlined" />
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Specifications */}
        {propertyType && propertyTypeConfig[propertyType] && (
          <Box sx={{ mb: 3 }}>
            <SectionTitle title="Specifications" />
            <Paper sx={paperStyle}>
              <Box sx={{ display: 'grid', gap: 2 }}>
                {Object.entries(propertyTypeConfig[propertyType]).map(([key, field]) =>
                  field.type === 'select' ? (
                    <FormControl key={key} fullWidth>
                      <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                      <Select
                        name={field.name}
                        value={specifications[field.name] || ''}
                        onChange={handleSpecificationChange}
                        variant="outlined"
                      >
                        {field.options?.map((opt) => (
                          <MenuItem key={opt} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Box key={key}>
                      <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                      <TextField
                        fullWidth
                        type={field.type}
                        name={field.name}
                        value={specifications[field.name] || ''}
                        onChange={handleSpecificationChange}
                        variant="outlined"
                      />
                    </Box>
                  )
                )}
              </Box>
            </Paper>
          </Box>
        )}

        {/* Payment Options */}
       {listingFor === 'book' && (
  <Box sx={{ mb: 3 }}>
    <SectionTitle title="Payment Options" />
    <Paper sx={paperStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button
          variant={paymentOption === 'later' ? 'contained' : 'outlined'}
          onClick={() => setPaymentOption('later')}
          sx={{
            backgroundColor: paymentOption === 'later' ? '#00acc1' : 'inherit',
            color: paymentOption === 'later' ? '#fff' : 'inherit',
            borderColor: '#00acc1',
            flex: 1,
          }}
        >
          Pay Later
        </Button>
        <Button
          variant={paymentOption === 'now' ? 'contained' : 'outlined'}
          onClick={() => setPaymentOption('now')}
          sx={{
            backgroundColor: paymentOption === 'now' ? '#00acc1' : 'inherit',
            color: paymentOption === 'now' ? '#fff' : 'inherit',
            borderColor: '#00acc1',
            flex: 1,
          }}
        >
          Pay Now
        </Button>
      </Box>
    </Paper>
  </Box>
)}



        {/* Book Now */}
        {listingFor === 'book' && (
        <Box sx={{ mb: 3 }}>
          <SectionTitle title="Book Now" />
          <Paper sx={paperStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <TextField fullWidth variant="outlined" margin="normal" />
            </Box>
          </Paper>
        </Box>
        )}



        {/* Preview Button */}
 <Button
  variant="contained"
  color="primary"
  fullWidth
  onClick={handleSubmit}
>
  Show Preview
</Button>

{formError && (
  <Typography color="error" sx={{ mt: 1 ,  textAlign: 'center'}}>
    {formError}
  </Typography>
)}


      </Box>
    </Box>
  );
};


export default AddPropertyForm;
