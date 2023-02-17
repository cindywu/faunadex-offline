import React, { useRef, useEffect, useState } from 'react'
import { Reflect } from '@rocicorp/reflect'
import { M } from '../datamodel/mutators'
import { usePlantByID } from '../datamodel/subscriptions'

// priority to the Hawaiian name followed by genus and species in parentheses.
// If no Hawaiian name, then the common name.

export default function PlantPage({reflect, plantID} : {reflect: Reflect<M>, plantID: string}) {
  const plant = usePlantByID(reflect, plantID)
  console.log({plant})


  return (
    <div>
      {plant &&
        <div className={"p-4"}>
          <PlantHeader
            plant={plant}
          />
          <PlantProperty
            reflect={reflect}
            plantID={plantID}
            propertyName={'hawaiianName'}
            plantProperty={plant.hawaiianName? plant.hawaiianName : ''}
          />
          <PlantProperty
            reflect={reflect}
            plantID={plantID}
            propertyName={'genus'}
            plantProperty={plant.genus ? plant.genus : ''}
          />
          <PlantProperty
            reflect={reflect}
            plantID={plantID}
            propertyName={'species'}
            plantProperty={plant.species ? plant.species : ''}
          />
        </div>
      }
    </div>
  )
}

function PlantHeader({plant}:any) {
  return(
    <div className={"text-2xl"}>
      {`${plant.hawaiianName} › ${plant.genus} (${plant.species})`}
    </div>
  )
}

function PlantProperty({reflect, plantID, propertyName, plantProperty}: {reflect: Reflect<M>, plantID: string, propertyName: string, plantProperty: any}){
  const [value, setValue] = useState(plantProperty)
  const valueRef = useRef<any>()
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    let data = {
      id: plantID,
      propertyName: propertyName,
      plantProperty: value,
    }
    console.log({data})
    reflect.mutate.updatePlant(data)
  }, [value])

  function updateValue(e:any) {
    if (valueRef && valueRef.current && valueRef.current.value) {
      setValue(valueRef.current.value)
    }
  }

  return (
    <div className={'flex flex-col'}>
      <div className={"flex justify-between max-w-md"}>
        <div>{propertyName}</div>
        {showInput ?
          <input
          className={''}
          ref={valueRef}
          placeholder={propertyName}
          value={value}
          onChange={(e) => updateValue(e)}
        />
        :
          <div onClick={() => setShowInput(!showInput)}>{plantProperty}</div>
        }
      </div>
    </div>

  )
}
