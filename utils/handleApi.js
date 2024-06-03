export default async function handleApi({ body, method, url }) {
  try {
    const response = await fetch("https://tinperest-22046-default-rtdb.firebaseio.com" + url, {
      method: method,
      body: body ? JSON.stringify(body) : '',
    });
    if (!response.ok) {
      console.log(response);
      return false;
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
