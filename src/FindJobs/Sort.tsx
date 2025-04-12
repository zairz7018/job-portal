import { useState } from 'react';
import { Combobox, useCombobox, } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

const opt = ['Relevance', 'Most Recent', 'Salary (Low to high)', 'Salary (high to low)'];

const Sort=()=> {
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    

      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div onClick={()=>combobox.toggleDropdown()} className='border cursor-pointer border-bright-sun-400 flex px-2 gap-2 py-1 text-sm rounded-xl items-center'>
            {selectedItem} <IconAdjustments  className='h-5 w-5 text-bright-sun-400'/>
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    
  );
}
export default Sort;