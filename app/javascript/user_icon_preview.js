function userIconPreview() {
  const formJudge = document.querySelector('.UserSignUpForm')
  if (!formJudge) return null

  const preview = document.querySelector('.UserSignUpIconWrap')

  const fileField = document.querySelector('input[type="file"][name="user[image]"]')
  fileField.addEventListener('change', (e) => {

    const alreadyPreview = document.querySelector('.UserSignUpIconPreview')
    if (alreadyPreview) {
      alreadyPreview.remove()
    }

    const file = e.target.files[0]
    const blob = window.URL.createObjectURL(file)
    const previewIcon = document.createElement('img')
    previewIcon.setAttribute('src', blob)
    previewIcon.setAttribute('class', 'UserSignUpIconPreview')
    preview.appendChild(previewIcon)
    preview.removeAttribute('class', 'hidden')
  })
}

window.addEventListener('load', userIconPreview)