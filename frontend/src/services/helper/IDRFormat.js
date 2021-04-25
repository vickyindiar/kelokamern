export const formatRupiah = (angka, prefix) => {
    if (typeof angka === 'number') {
        angka = angka.toString();
    }
    let separator = null;
    let result = angka;
	let number_string = angka.replace(/[^,\d]/g, '').toString();
	let split   		= number_string.split(',');
	let sisa     		= split[0].length % 3;
	let rupiah     		= split[0].substr(0, sisa);
	let ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? ',' : '';
		rupiah += separator + ribuan.join(',');
	}

	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

    if (prefix === undefined) result = 'Rp. ' + rupiah
    else if( prefix === false) result = rupiah
    else result = 'Rp. ' + rupiah;
	return result;
}