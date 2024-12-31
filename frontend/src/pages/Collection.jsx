  import React, { useContext, useEffect, useState } from 'react'
  import { ShopContext } from '../context/ShopContext'
  import { assets } from '../assets/assets';
  import Title from '../components/Title';
  import ProductItem from '../components/ProductItem';
  import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
  import { useLocation } from 'react-router-dom';

  const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');
    const [activeFilter, setActiveFilter] = useState({ category: false, type: false, sortBy: false });
    

    // Voice Commands for category, type, and sort
    const commands = [
      // Voice commands for adding categories
      {
        command: "category",
        callback: () => setActiveFilter({ category: true, type: false, sortBy: false }),
      },
      {
        command: "men",
        callback: () => toggleCategory({ target: { value: 'Men' } }),
      },
      {
        command: "women",
        callback: () => toggleCategory({ target: { value: 'Women' } }),
      },
      {
        command: "kids",
        callback: () => toggleCategory({ target: { value: 'Kids' } }),
      },

      // Voice commands for removing categories
      {
        command: "remove men",
        callback: () => toggleCategory({ target: { value: 'Men' } }),
      },
      {
        command: "remove women",
        callback: () => toggleCategory({ target: { value: 'Women' } }),
      },
      {
        command: "remove kids",
        callback: () => toggleCategory({ target: { value: 'Kids' } }),
      },

      // Voice commands for adding subcategories
      {
        command: "type",
        callback: () => setActiveFilter({ category: false, type: true, sortBy: false }),
      },
      {
        command: "top wear",
        callback: () => toggleSubcategory({ target: { value: 'Topwear' } }),
      },
      {
        command: "Dresses",
        callback: () => toggleSubcategory({ target: { value: 'Dresses' } }),
      },
      {
        command: "Accessories",
        callback: () => toggleSubcategory({ target: { value: 'Accessories' } }),
      },

      // Voice commands for removing subcategories
      {
        command: "remove top wear",
        callback: () => toggleSubcategory({ target: { value: 'Topwear' } }),
      },
      {
        command: "remove Dresses",
        callback: () => toggleSubcategory({ target: { value: 'Dresses' } }),
      },
      {
        command: "remove Accessories",
        callback: () => toggleSubcategory({ target: { value: 'Accessories' } }),
      },

      // Voice commands for sorting products
      {
        command: "sort by",
        callback: () => setActiveFilter({ category: false, type: false, sortBy: true }),
      },
      {
        command: "low to high",
        callback: () => setSortType('low-high'),
      },
      {
        command: "high to low",
        callback: () => setSortType('high-low'),
      },
      {
        command: "relevant",
        callback: () => setSortType('relevant'),
      },
    ];

    useSpeechRecognition({ commands });

    const toggleCategory = (e) => {
      const value = e.target.value;
      if (category.includes(value)) {
        setCategory(prev => prev.filter(item => item !== value));
      } else {
        setCategory(prev => [...prev, value]);
      }
    };

    const toggleSubcategory = (e) => {
      const value = e.target.value;
      if (subCategory.includes(value)) {
        setSubCategory(prev => prev.filter(item => item !== value));
      } else {
        setSubCategory(prev => [...prev, value]);
      }
    };

    const applyFilter = () => {
      let productsCopy = products.slice();

      if (showSearch && search) {
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      }

      if (category.length > 0) {
        productsCopy = productsCopy.filter(item => category.includes(item.category));
      }

      if (subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
      }

      setFilterProducts(productsCopy);
    };

    const sortProduct = () => {
      let fpCopy = filterProducts.slice();
      switch (sortType) {
        case 'low-high':
          setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
          break;
        case 'high-low':
          setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
          break;
        default:
          applyFilter();
          break;
      }
    };

    useEffect(() => {
      applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    useEffect(() => {
      sortProduct();
    }, [sortType]);

    return (
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Filter Options */}
        <div className='min-w-60'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
            FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>

          {/* Category Filter */}
          <div className={`border ${activeFilter.category ? 'border-green-500' : 'border-gray-300'} pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value='Men' onChange={toggleCategory} checked={category.includes('Men')} />Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value='Women' onChange={toggleCategory} checked={category.includes('Women')} />Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value='Kids' onChange={toggleCategory} checked={category.includes('Kids')} />Kids
              </p>
            </div>
          </div>

          {/* SubCategory Filter */}
          <div className={`border ${activeFilter.type ? 'border-green-500' : 'border-gray-300'} pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value='Topwear' onChange={toggleSubcategory} checked={subCategory.includes('Topwear')} />Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value='Dresses' onChange={toggleSubcategory} checked={subCategory.includes('Dresses')} />Dresses
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value='Accessories' onChange={toggleSubcategory} checked={subCategory.includes('Accessories')} />Accessories
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />

            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} value={sortType} className={`border-2 text-sm px-2 ${activeFilter.sortBy ? 'border-green-500' : 'border-gray-300'}`}>
              <option value="relevant"> Sort by: Relevant</option>
              <option value="low-high"> Sort by: Low to High</option>
              <option value="high-low"> Sort by: High to Low</option>
            </select>
          </div>

          {/* Map Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Collection;
