import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getClients } from '../../api/clients';

export interface ClientOption {
  id: number;
  label: string;
}

const fetchClients = (input: string) => getClients(input ? { firstname: input, lastname: input } : undefined);

export function ClientPicker({ value, onChange, ...params }: { [x: string]: any }) {
  const [searchField, setSearchField] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ClientOption[]>([]);
  const loading = open && options.length === 0;

  const onChangeSearchField = (event: any, value: string, reason: any) => setSearchField(value)

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const loadedClients = await fetchClients(searchField);

      if (active) {
        setOptions(loadedClients.map(c => ({ id: c.id, label: `${c.surname}, ${c.name}` })));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, searchField]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label}
      onChange={onChange}
      value={value}
      options={options}
      loading={loading}
      onInputChange={onChangeSearchField}
      inputValue={searchField}
      renderInput={(inputParams) => (
        <TextField
          {...params}
          {...inputParams}
          InputProps={{
            ...inputParams.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {inputParams.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
