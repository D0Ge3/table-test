import React, { useEffect, useState } from 'react'

import { VirtualizedTable } from '../VirtualizedTable/VirtualuzedTable'
import { airAPI } from '../../api/airAPI'

export default function ReactVirtualizedTable() {
  const [page, setPage] = useState(0)
  const [passengers, setPassengers] = useState([])
  const [totalPages, setTotalPages] = useState()
  useEffect(() => {
    airAPI.getPassengers(page).then((res) => {
      setPassengers(
        res.data.data.map((p) => ({
          _id: p._id,
          name: p.name,
          trips: p.trips,
          airlineName: p.airline.name,
          airlineCountry: p.airline.country,
          airlineLogo: p.airline.logo,
          airlineSlogan: p.airline.slogan,
          airlineHeadQ: p.airline.head_quaters,
          airlineWebsite: p.airline.website,
          airlineEstablished: p.airline.established,
        }))
      )
      setTotalPages(res.data.totalPages)
    })
    // eslint-disable-next-line
  }, [page])
  return (
    <div style={{ height: '98vh' }}>
      <VirtualizedTable
        rowCount={passengers.length}
        rowGetter={({ index }) => passengers[index]}
        columns={[
          {
            width: 50,
            label: '№',
            dataKey: '_id',
            numbering: true,
          },
          {
            width: 150,
            label: 'Имя пассажира',
            dataKey: 'name',
          },
          {
            width: 120,
            label: 'Кол-во путешествий',
            dataKey: 'trips',
            numeric: true,
          },
          {
            width: 130,
            label: 'Название авиакомпании',
            dataKey: 'airlineName',
          },
          {
            width: 120,
            label: 'Страна авиакомпании',
            dataKey: 'airlineCountry',
          },
          {
            width: 300,
            label: 'Лого авиакомпании',
            dataKey: 'airlineLogo',
            image: true,
          },
          {
            width: 200,
            label: 'Слоган авиакомпании',
            dataKey: 'airlineSlogan',
          },
          {
            width: 300,
            label: 'Офис авиакомпании',
            dataKey: 'airlineHeadQ',
          },
          {
            width: 150,
            label: 'Сайт авиакомпании',
            dataKey: 'airlineWebsite',
            link: true,
          },
          {
            width: 135,
            label: 'Год основания авиакомпании',
            dataKey: 'airlineEstablished',
            numeric: true,
          },
        ]}
      />
    </div>
  )
}
