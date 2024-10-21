window.addEventListener('load', function() {
    const username = 'nhtoi'
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            const gallery = document.getElementById('gallery')
            gallery.innerHTML = ''  
            repos.forEach(repo => {
                const repoCard = document.createElement('div')
                repoCard.classList.add('repo-card')
                repoCard.innerHTML = `
                    <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                    <p>${repo.description || 'No description available'}</p>
                    <p>Created: ${new Date(repo.created_at).toDateString()}</p>
                    <p>Last updated: ${new Date(repo.updated_at).toDateString()}</p>
                    <p>Watchers: ${repo.watchers_count}</p>
                    <p>Languages: <span id="languages-${repo.name}"></span></p>
                `

                gallery.appendChild(repoCard)

                
                fetch(repo.languages_url)
                    .then(langResponse => langResponse.json())
                    .then(languages => {
                        const languagesList = Object.keys(languages).join(', ') || 'None'
                        document.getElementById(`languages-${repo.name}`).textContent = languagesList
                    })
            })
        })
        .catch(error => console.error('Error fetching repositories:', error))
})
document.getElementById('search-btn').addEventListener('click', function() {
    const username = document.getElementById('username').value || 'nhtoi'

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            const gallery = document.getElementById('gallery')
            gallery.innerHTML = ''  
            
            repos.forEach(repo => {
                const repoCard = document.createElement('div')
                repoCard.classList.add('repo-card')
                repoCard.innerHTML = `
                    <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                    <p>${repo.description || 'No description available'}</p>
                    <p>Created: ${new Date(repo.created_at).toDateString()}</p>
                    <p>Last updated: ${new Date(repo.updated_at).toDateString()}</p>
                    <p>Watchers: ${repo.watchers_count}</p>
                    <p>Languages: <span id="languages-${repo.name}"></span></p>
                `

                gallery.appendChild(repoCard)
                fetch(repo.languages_url)
                    .then(langResponse => langResponse.json())
                    .then(languages => {
                        const languagesList = Object.keys(languages).join(', ') || 'None'
                        document.getElementById(`languages-${repo.name}`).textContent = languagesList
                    })
            })
        })
        .catch(error => console.error('Error fetching repositories:', error))
})