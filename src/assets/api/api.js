function muscleAPI(method, target, callback) {
  let xhr = new XMLHttpRequest
  let url = `https://focus-muscle-default-rtdb.asia-southeast1.firebasedatabase.app/${target}.json`
  xhr.open(method, url, true)
  let data = xhr.responseText
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200 ){
      console.log(xhr);
    }
  }
  xhr.send()
}

export default muscleAPI