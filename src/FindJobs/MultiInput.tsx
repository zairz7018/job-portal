  import { useEffect, useState } from 'react';
  import {Checkbox,Combobox,Group,Input,Pill,PillsInput,useCombobox}
  from '@mantine/core';
  import { IconSelector } from '@tabler/icons-react';
  import { useDispatch } from 'react-redux';
  import { updateFilter } from '../Slices/FilterSlice';

  
  const MultiInput = (props: any) => {
    const dispatch = useDispatch();
    useEffect(()=>{
      setData(props.options);
    },[props.options]) 

    const combobox = useCombobox({
      onDropdownClose:()=>
        combobox.resetSelectedOption(),
        onDropdownOpen : () =>
        combobox.updateSelectedOptionIndex('active')
    });
    const [search, setSearch] = useState('');
    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);
    const exactOptionMatch = data.some((item) => item === search);
    const handleValueSelect = (val:string)=>{
      setSearch('');
      
      if(val === '$create'){
        setData((current) => [...current, search]);
        const updatedValue = [...value, search];  // Capture the updated value
        setValue(updatedValue);  // Update the state first
        dispatch(updateFilter({ [props.title]: updatedValue })); // Use updatedValue directly
    }else{
        const updatedValue = value.includes(val) 
            ? value.filter((v) => v !== val) 
            : [...value, val];
        setValue(updatedValue); // Update the state first
        dispatch(updateFilter({ [props.title]: updatedValue }));
    }
    
    }
    const handleValueRemove = (val:string) => {
      dispatch(updateFilter({ [props.title] : value.filter((v)=> v!== val) }));
      setValue((current)=> current.filter((v)=> v!== val));
      const values = value.slice(0,1)
      .map((item)=>(
        <Pill key={item} withRemoveButton onRemove={()=>handleValueRemove(item)} >
          {item.length>=10 ? item.substring(0,8)+".."  :item}
        </Pill>
      ));
    }

    

    const options = data
      .filter((item) =>
        item.toLowerCase().includes(search.trim().toLowerCase())
      )
      .map((item, index) => (
        <Combobox.Option value={item} key={item} active={value.includes(item)}>
          <Group gap="sm">
            <Checkbox
              size="xs"
              color="brightSun.4"
              checked={value.includes(item)}
              onChange={() => {}}
              aria-hidden
              tabIndex={-1}
              style={{ pointerEvents: 'none' }}
            />
            <span className="text-mine-shaft-300">{item}</span>
          </Group>
        </Combobox.Option>
      ));

    return (
      <Combobox
        store={combobox}
        onOptionSubmit={handleValueSelect}
        withinPortal={false}
      >
        <Combobox.DropdownTarget>
          <PillsInput
            variant="unstyled"
            rightSection={<IconSelector />}
            onClick={() => combobox.toggleDropdown()}
            leftSection={
              <div className="text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2">
                <props.icon />
              </div>
            }
          >
            <Pill.Group>
  {value.length > 0 ? (
    <>
      {value.slice(0, 3).map((item) => (
        <Pill 
          key={item} 
          withRemoveButton 
          onRemove={() => handleValueRemove(item)}
          className="!bg-mine-shaft-800 !text-bright-sun-400" // Ajout de style explicite
        >
          {item.length >= 10 ? item.substring(0, 8) + ".." : item}
        </Pill>
      ))}
      {value.length > 3 && <Pill>+{value.length - 3} more</Pill>}
    </>
  ) : (
    <Input.Placeholder className="!text-mine-shaft-200">
      {props.title}
    </Input.Placeholder>
  )}
</Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search groceries"
          />
          <Combobox.Options>
            {options}

            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
            )}

            {exactOptionMatch &&
              search.trim().length > 0 &&
              options.length === 0 && (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );
  };

  export default MultiInput;
