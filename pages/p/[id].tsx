import React, { useEffect, useState } from 'react'

export default function Home() {
  const [plantID, setPlantID] = useState<string | null>(null)

  useEffect(() => {
    const [, , plantID] = location.pathname.split("/");
    console.log({plantID})
    setPlantID(plantID)

    const roomID = `faunadex-plants`;

    // (async () => {
    //   logger.info?.(`Connecting to worker at ${workerWsURI}`);
    //   // const userID = clientUserID ? clientUserID : nanoid();
    //   const userID = "cindy" // FIX THIS!!
    //   const r = new Reflect<M>({
    //     socketOrigin: workerWsURI,
    //     onOnlineChange: setOnline,
    //     userID,
    //     roomID,
    //     auth: JSON.stringify({
    //       userID,
    //       roomID,
    //     }),
    //     logSinks: [logSink],
    //     mutators: clientMutators,
    //   });

    //   // const defaultUserInfo = randUserInfo();
    //   // await r.mutate.initClientState({
    //   //   id: await r.clientID,
    //   //   defaultUserInfo,
    //   // });
    //   // await r.mutate.initShapes();

    //   setReflectClient(r);
    // })();


  }, [])

  return (
    <div>{`i am a plant ${plantID}`}</div>
  )
}
