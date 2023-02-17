

import React, { useEffect, useState } from 'react'
import { DataDogBrowserLogSink } from '../../components/data-dog-browser-log-sink'
import { consoleLogSink, OptionalLoggerImpl } from '@rocicorp/logger'
import { Reflect } from '@rocicorp/reflect'
import { M, clientMutators } from '../../datamodel/mutators'
import { workerWsURI } from '../../util/host'
import PlantPage from '../../components/plant-page'

export default function Home() {
  const [plantID, setPlantID] = useState<string | null>(null)

  const [reflect, setReflectClient] = useState<Reflect<M> | null>(null)
  const [_, setOnline] = useState(false)

  const [clientUserID, setClientUserID] = useState<string | null>(null)

  const logSink = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN
    ? new DataDogBrowserLogSink()
    : consoleLogSink;
  const logger = new OptionalLoggerImpl(logSink);


  useEffect(() => {
    const [, , plantID] = location.pathname.split("/");
    console.log({plantID})
    setPlantID(plantID)

    const roomID = `faunadex-plants`;

    (async () => {
      logger.info?.(`Connecting to worker at ${workerWsURI}`);
      // const userID = clientUserID ? clientUserID : nanoid();
      const userID = "cindy" // FIX THIS!!
      const r = new Reflect<M>({
        socketOrigin: workerWsURI,
        onOnlineChange: setOnline,
        userID,
        roomID,
        auth: JSON.stringify({
          userID,
          roomID,
        }),
        logSinks: [logSink],
        mutators: clientMutators,
      });

      // const defaultUserInfo = randUserInfo();
      // await r.mutate.initClientState({
      //   id: await r.clientID,
      //   defaultUserInfo,
      // });
      // await r.mutate.initShapes();

      setReflectClient(r);
    })();
  }, []);

  if (!reflect) {
    return null
  }

  return (
    <div>
      <PlantPage
        reflect={reflect}
        plantID={plantID}
      />
    </div>
  )
}
