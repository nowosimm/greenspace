import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faDroplet, faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons'

const sunlightOptions = [
    { name: 'Direct', inStock: true },
    { name: 'Bright Indirect', inStock: true },
    { name: 'Moderate', inStock: true },
    { name: 'Low', inStock: true },
]
const sunlightIcon = <FontAwesomeIcon icon={faSun} />

const waterOptions = [
    { name: 'Keep Moist', inStock: true },
    { name: 'Top 1/3', inStock: true },
    { name: 'Top 1/2', inStock: true },
    { name: 'Dry Out', inStock: true },
]
const waterIcon = <FontAwesomeIcon icon={faDroplet} />

const humidityOptions = [
    { name: 'Extreme', inStock: true },
    { name: 'High', inStock: true },
    { name: 'Moderate', inStock: true },
    { name: 'Low', inStock: true },
]
const humidityIcon = <FontAwesomeIcon icon={faSprayCanSparkles} />

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [plantType, setPlantType] = useState('');
    const [sunlightMem, setSunlightMem] = useState(sunlightOptions[2])
    const [waterMem, setWaterMem] = useState(waterOptions[2])
    const [humidityMem, setHumidityMem] = useState(humidityOptions[2])

    const submitForm = async () => {
        let json = {
            type: plantType,
            water: waterMem.name,
            humidity: humidityMem.name,
            sunlight: sunlightMem.name
        };
        let response = await fetch("http://localhost:3000/addPlant", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        console.log(response)
    }

    return (
        <form name="form1">
            <div className="space-y-12 font-body">
                <div className="font-semibold text-xl mb-10">New Plant Form</div>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Congratulations on your new plant baby! Complete this form to help track your new babies growth and care.</h2>

                    <div>
                        <div className='flex mt-10'>

                            <div className="grow mr-5">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Plant Name or Type
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="type"
                                        id="type"
                                        autoComplete="given-name"
                                        onChange={e => setPlantType(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-base font-semibold leading-7 text-gray-900 mt-10">Care Instructions</h2>
                        <div className='mx-20 my-10'>

                            <RadioGroup value={waterMem} onChange={setWaterMem} className="mt-2 col-span-full">
                                <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
                                <div className='flex items-center'>
                                    <div className='text-3xl mr-5 text-slate-300 py-4'>{waterIcon}</div>
                                    <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 grow">
                                        {waterOptions.map((option) => (
                                            <RadioGroup.Option
                                                key={option.name}
                                                value={option}
                                                name="water"
                                                id="water"
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        option.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                                                        active ? 'ring-2 ring-lime-600 ring-offset-2' : '',
                                                        checked
                                                            ? 'bg-lime-600 text-white hover:bg-lime-600'
                                                            : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                                        'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold  sm:flex-1'
                                                    )
                                                }
                                                disabled={!option.inStock}
                                            >
                                                <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </div>
                            </RadioGroup>

                            <RadioGroup value={sunlightMem} onChange={setSunlightMem} className="mt-2 col-span-full">
                                <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
                                <div className='flex items-center'>
                                    <div className='text-3xl mr-5 text-slate-300 py-4'>{sunlightIcon}</div>
                                    <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 grow">
                                        {sunlightOptions.map((option) => (
                                            <RadioGroup.Option
                                                key={option.name}
                                                name="sunlight"
                                                id="sunlight"
                                                value={option}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        option.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                                                        active ? 'ring-2 ring-lime-600 ring-offset-2' : '',
                                                        checked
                                                            ? 'bg-lime-600 text-white hover:bg-lime-600'
                                                            : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                                        'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold  sm:flex-1'
                                                    )
                                                }
                                                disabled={!option.inStock}
                                            >
                                                <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>

                                </div>

                            </RadioGroup>

                            <RadioGroup value={humidityMem} onChange={setHumidityMem} className="mt-2 col-span-full">
                                <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
                                <div className='flex'>
                                    <div className='text-3xl mr-5 text-slate-300 py-4'>{humidityIcon}</div>
                                    <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 grow  py-4">
                                        {humidityOptions.map((option) => (
                                            <RadioGroup.Option
                                                key={option.name}
                                                name="humidity"
                                                id="humidity"
                                                value={option}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        option.inStock ? 'cursor-pointer focus:outline-none' : 'cursor-not-allowed opacity-25',
                                                        active ? 'ring-2 ring-lime-600 ring-offset-2' : '',
                                                        checked
                                                            ? 'bg-lime-600 text-white hover:bg-lime-600'
                                                            : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                                                        'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold  sm:flex-1'
                                                    )
                                                }
                                                disabled={!option.inStock}
                                            >
                                                <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>

                                </div>

                            </RadioGroup>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12 col-span-full">
                        </div>

                        <div>
                            <label htmlFor="cover-photo" className="mt-10 block text-sm font-medium leading-6 text-gray-900">
                                Upload Image
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-lime-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-lime-600 focus-within:ring-offset-2 hover:text-lime-600"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={submitForm}
                    className="rounded-md bg-lime-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
