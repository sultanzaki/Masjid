import React,  { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Marquee } from '@animatereactnative/marquee';
import { toHijri } from 'hijri-converter';

const daysInIndonesian = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const monthsInIndonesian = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                             "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const hijriMonths = ['Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir', 'Jumadil Awal', 'Jumadil Akhir',
                      'Rajab', 'Sya\'ban', 'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah']; 

const API_URL = 'https://666c1a7649dbc5d7145c9c1b.mockapi.io/api/dataMasjid/dataMasjid';
const PrayerScheduleApp = () => {
    // State untuk waktu saat ini
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));

    // State untuk tanggal saat ini
    const [currentDate, setCurrentDate] = useState('');
    const [hijriDate, setHijriDate] = useState('');

    // State untuk data mesjid
    const [masjidName, setMasjidName] = useState('');
    const [masjidAddress, setMasjidAddress] = useState('');
    const [masjidDescription, setMasjidDescription] = useState('');
  
    // Efek untuk memperbarui waktu setiap detik
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      }, 1000); // Perbarui setiap detik
      return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
    }, []);
  
    // Efek untuk memperbarui tanggal setiap hari
    useEffect(() => {
      const updateDate = () => {
        const now = new Date();
        const dayIndex = now.getDay();
        const day = daysInIndonesian[dayIndex];
        const date = now.getDate();
        const monthIndex = now.getMonth();
        const month = monthsInIndonesian[monthIndex];
        const year = now.getFullYear();
  
        const hijri = toHijri(year, monthIndex + 1, date); // Perhatikan bahwa bulan di JavaScript dimulai dari 0
        const hijriDay = hijri.hd;
        const hijriMonth = hijriMonths[hijri.hm - 1]; // -1 karena index hijri.hm dimulai dari 1
        const hijriYear = hijri.hy;
  
        setCurrentDate(`${day}, ${date} ${month} ${year}`);
        setHijriDate(`${hijriDay} ${hijriMonth} ${hijriYear}`);
      };
  
      updateDate(); // Setel tanggal awal
      const intervalId = setInterval(updateDate, 86400000); // Perbarui setiap hari (86400000 milidetik dalam sehari)
      return () => clearInterval(intervalId);
    }, []);

    // Efek untuk mengambil data dari API
  useEffect(() => {
    const fetchMasjidData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMasjidName(data.nama_masjid);
        setMasjidAddress(data.alamat_masjid);
        setMasjidDescription(data.deskripsi_masjid);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMasjidData(); // Ambil data awal
    const intervalId = setInterval(fetchMasjidData, 3000); // Perbarui setiap 60 detik
    return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <View style={tw`flex-row items-center justify-between bg-gray-100 p-4`}>
        <Text style={tw`text-5xl font-bold`} id="clock">{currentTime}</Text>
        <View style={tw`text-center`}>
          <Text style={tw`text-3xl font-black`}>{masjidName}</Text>
          <Text style={tw`text-xl font-bold`}>{masjidAddress}</Text>
        </View>
        <View style={tw`text-right`}>
          <Text style={tw`text-xl font-bold`} id="date">{currentDate}</Text>
          <Text style={tw`text-xl font-semibold`} id="hijri-date">{hijriDate}</Text>
        </View>
      </View>
      <View style={tw`flex-1 flex-row overflow-hidden`}>
        <View style={tw`w-1/4 flex-col justify-between bg-gray-100 p-4`}>
          <View style={tw`mb-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`rounded-full bg-orange-500 px-5 py-3 mr-2`}>
                <Text style={tw`text-3xl font-bold text-white`}>Subuh</Text>
              </View>
            </View>
            <Text style={tw`text-4xl font-bold`}>04.34</Text>
          </View>
          <View style={tw`mb-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`rounded-full bg-yellow-500 px-5 py-3 mr-2`}>
                <Text style={tw`text-3xl font-bold text-white`}>Dzuhur</Text>
              </View>
            </View>
            <Text style={tw`text-4xl font-bold`}>11.49</Text>
          </View>
          <View style={tw`mb-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`rounded-full bg-blue-500 px-5 py-3 mr-2`}>
                <Text style={tw`text-3xl font-bold text-white`}>Ashar</Text>
              </View>
            </View>
            <Text style={tw`text-4xl font-bold`}>15.11</Text>
          </View>
          <View style={tw`mb-2 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`rounded-full bg-teal-500 px-5 py-3 mr-2`}>
                <Text style={tw`text-3xl font-bold text-white`}>Magrib</Text>
              </View>
            </View>
            <Text style={tw`text-4xl font-bold`}>17.41</Text>
          </View>
          <View style={tw`flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`rounded-full bg-indigo-900 px-5 py-3 mr-2`}>
                <Text style={tw`text-3xl font-bold text-white`}>Isya</Text>
              </View>
            </View>
            <Text style={tw`text-4xl font-bold`}>18.56</Text>
          </View>
        </View>
        <View style={tw`flex-1 overflow-hidden`}>
          <Image
            source={{ uri: 'https://masjidaljabbar.com/wp-content/uploads/2023/02/masjid-al-jabbar-3.jpg' }}
            style={{ flex: 1 }}
            resizeMode="cover" // Menggunakan resizeMode sebagai properti
          />
        </View>
      </View>
      <View style={tw`p-2`}>
        <Marquee spacing={500} speed={1}>
          <Text style={tw`text-xl font-bold`}>{masjidDescription}</Text>
        </Marquee>
      </View>
    </View>
  );
};

export default PrayerScheduleApp;
