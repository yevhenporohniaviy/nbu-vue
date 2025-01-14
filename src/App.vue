<template>
  <div>
    <nav>
      <div class="container">
        <ul class="list">
          <li><router-link to="/">Головна</router-link></li>
          <li><router-link to="/search">Пошук курсу</router-link></li>
          <li><router-link to="/modified">Змінені курси</router-link></li>
        </ul>
      </div>
    </nav>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f7f7f7;
  border-bottom: 1px solid #ccc;
}

.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.list {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
