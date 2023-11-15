import { firestore } from '@/services/firebase'
import { MusicResponseProps } from '@/types/musicProps'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useCallback } from 'react'

import { ArtistsResponseProps } from '@/types/artistsProps'

import { MusicalGenresDataProps } from '@/types/musicalGenresProps'
import { UserDataProps } from '@/types/userProps'

export function useFirebaseServices() {
  const getMusics = async () => {
    let musicsResponse = [] as MusicResponseProps[]
    const q = query(collection(firestore, 'musics'))
    await getDocs(q).then((querySnapshot) => {
      const response = querySnapshot.docs.map((doc) =>
        doc.data(),
      ) as MusicResponseProps[]

      musicsResponse = response
    })

    return musicsResponse
  }

  const getArtists = useCallback(async () => {
    let artistsResponse = [] as ArtistsResponseProps[]
    const q = query(collection(firestore, 'artists'))
    await getDocs(q).then((querySnapshot) => {
      const response = querySnapshot.docs.map((doc) =>
        doc.data(),
      ) as ArtistsResponseProps[]

      artistsResponse = response
    })

    return artistsResponse
  }, [])

  const getUsers = async () => {
    let users = [] as UserDataProps[]
    const q = query(collection(firestore, 'users'))
    await getDocs(q).then((querySnapshot) => {
      const response = querySnapshot.docs.map((doc) =>
        doc.data(),
      ) as UserDataProps[]

      users = response
    })

    return users
  }

  const getGenres = async () => {
    let musicalGenresResponse = [] as MusicalGenresDataProps[]
    const q = query(collection(firestore, 'musicalGenres'))
    await getDocs(q).then((querySnapshot) => {
      const response = querySnapshot.docs.map((doc) =>
        doc.data(),
      ) as MusicalGenresDataProps[]

      musicalGenresResponse = response
    })

    return musicalGenresResponse
  }

  const getMusicsById = async (ids: string[]) => {
    const musicsResponse = [] as MusicResponseProps[]
    const q = query(collection(firestore, 'musics'))

    const querySnapshot = await getDocs(query(q, where('id', 'in', ids)))
    querySnapshot.forEach((doc) => {
      const musicData = doc.data() as MusicResponseProps
      musicsResponse.push(musicData)
    })

    return musicsResponse
  }

  const getArtistById = async (id: string) => {
    let response = {} as ArtistsResponseProps
    const q = query(collection(firestore, 'artists'))

    const querySnapshot = await getDocs(query(q, where('id', '==', id)))
    response = querySnapshot.docs[0].data() as ArtistsResponseProps

    return response
  }

  return {
    getArtists,
    getGenres,
    getMusics,
    getUsers,
    getMusicsById,
    getArtistById,
  }
}
