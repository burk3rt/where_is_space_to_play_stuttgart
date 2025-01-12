import { useState } from 'react';
import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';

const MultiSelectDropdown = ({ options, selectedOptions, onOptionSelect }) => {
  const [selectedValues, setSelectedValues] = useState(selectedOptions || []);

  const handleOptionSelect = (event) => {
    const selected = event.target.value;
    setSelectedValues(selected);
    onOptionSelect(selected);
  };

  const handleOptionRemove = (value) => {
    const updatedSelection = selectedValues.filter((val) => val !== value);
    setSelectedValues(updatedSelection);
    onOptionSelect(updatedSelection);
  };

  const DropdownFormControl = styled(FormControl)({
    minWidth: 200,
    marginBottom: '16px',
    color: 'primary.main',
  });

  const DropdownInput = styled(Input)({
    color: 'primary.main',
  });

  const DropdownChip = styled(Chip)({
    color: 'inherit',
    backgroundColor: 'primary.main',
    marginRight: '8px',
    marginBottom: '8px',
  });

  const DropdownIcon = styled(CancelIcon)({
    color: 'inherit',
  });

  return (
    <DropdownFormControl>
      <InputLabel>Filter Courts</InputLabel>
      <Select
        multiple
        value={selectedValues}
        onChange={handleOptionSelect}
        input={<DropdownInput />}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <DropdownChip
                key={value}
                label={value}
                onMouseDown={(event) => event.stopPropagation()}
                onDelete={() => handleOptionRemove(value)}
                deleteIcon={<DropdownIcon />}
              />
            ))}
          </div>
        )}
      >
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </DropdownFormControl>
  );
};

export default MultiSelectDropdown;