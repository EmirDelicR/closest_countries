'use client';

import {
  Box,
  Center,
  Combobox,
  Flex,
  Image,
  InputBase,
  Loader,
  Stack,
  Text,
  useCombobox,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { getCountries } from '../actions/countries';
import { useThrottledState, useThrottledValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { ApiResponseCountry } from '../interfaces/country';

export default function CountryWidget() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const throttledValue = useThrottledValue(search, 1000);

  const {
    data,
    mutate: server_getCountries,
    isPending,
    isError,
  } = useMutation({
    mutationFn: getCountries,
  });

  useEffect(() => {
    if (throttledValue.trim().length !== 0) {
      server_getCountries(throttledValue);
    }
  }, [throttledValue]);

  const serverData = data || [];

  const shouldFilterOptions = serverData.every((item) => item.value !== search);
  const filteredOptions = shouldFilterOptions
    ? serverData.filter((item) => item.value.toLowerCase().includes(search.toLowerCase().trim()))
    : serverData;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <SelectOption {...item} />
    </Combobox.Option>
  ));

  const renderDropdownOptionContent = () => {
    if (isPending) {
      return (
        <Center mt="lg">
          <Loader type="bars" role="loader" />
        </Center>
      );
    }

    if (options.length > 0) {
      return options;
    }

    return <Combobox.Empty>Nothing found</Combobox.Empty>;
  };

  return (
    <Stack mt={50} align="center">
      <Box maw={300}>
        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(val) => {
            setValue(val);
            setSearch(val);
            combobox.closeDropdown();
          }}
        >
          <Combobox.Target>
            <InputBase
              rightSection={<Combobox.Chevron />}
              value={search}
              onChange={(event) => {
                combobox.openDropdown();
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              }}
              onClick={() => combobox.openDropdown()}
              onFocus={() => combobox.openDropdown()}
              onBlur={() => {
                combobox.closeDropdown();
                setSearch(value || '');
              }}
              placeholder="Search value"
              rightSectionPointerEvents="none"
            />
          </Combobox.Target>

          <Combobox.Dropdown mah="300px" style={{ overflowY: 'auto' }}>
            <Combobox.Options>{renderDropdownOptionContent()}</Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Box>
      {isError && (
        <Center mt="lg">
          <Text c="red">Fail to load data</Text>
        </Center>
      )}
    </Stack>
  );
}

function SelectOption({ value, capital, region, flag }: ApiResponseCountry) {
  return (
    <Flex gap={'md'} align="center">
      <Image src={flag} radius="md" h={16} w={16} />
      <Box>
        <Text fz="sm" fw={500}>
          {value}
        </Text>
        <Text fz="xs" opacity={0.6}>
          Region: {region} - Capital: {capital}
        </Text>
      </Box>
    </Flex>
  );
}
