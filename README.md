# React Drag and Drop Board

A simple **Trello‑style drag and drop board** built with **React** using the **native HTML5 Drag & Drop API**.
This project demonstrates **column reordering** and **card movement between columns** without using external libraries.

---

## ✨ Features

* 🧱 Drag & drop **columns**
* 🗂️ Drag & drop **cards within the same column**
* 🔁 Move cards **between different columns**
* ⚛️ Built with **React Hooks** (`useState`, `useRef`)
* 🧠 Clean and predictable drag logic (no duplication bugs)
* 🎯 No third‑party drag libraries

---

## 🛠️ Tech Stack

* React
* JavaScript (ES6+)
* HTML5 Drag & Drop API
* SCSS / CSS

---

## 📂 Project Structure

```
src/
├── App.jsx        # Main drag & drop logic
├── styles.scss    # Basic stylin
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/shahariar270/react-drag-and-drop.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```
---
## 😊 Live Preview
```
https://react-drag-and-drop-8rfgp4mhx-shahariar270s-projects.vercel.app/
```

## 🧠 How It Works (Logic Overview)

### Card Drag

* Stores **source column index** and **card index** using `useRef`
* Removes the card from the source column
* Inserts the card into the target column at the drop position

### Column Drag

* Uses a **separate ref** to track dragged column index
* Reorders columns without interfering with card drag state

> 🔑 **Key Design Rule**
> One ref = one responsibility (card drag & column drag are isolated)

---

## ⚠️ Known Limitations

* No mobile / touch support
* No drag preview or placeholder
* No persistence (data resets on refresh)

---

## 🧪 Possible Improvements

* Empty column drop support
* Drag placeholder animation
* Touch / mobile support
* State persistence (LocalStorage / Backend)
* Convert logic to `useReducer`
* Keyboard accessibility

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is open‑source and available under the **MIT License**.

---

## 👤 Author

**Shahariar**
Frontend Developer (React)

---

Happy coding! 🚀
