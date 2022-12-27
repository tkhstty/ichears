function ideaImagePreviews() {
  const formJudge = document.querySelector('.IdeaForm')
  if (!formJudge) return null

  const previews = document.querySelector('.IdeaFormImagesWrap')
  const imagesLimit = 4

  // Form生成
  const buildImageForm = (dataIndex) => {
    // 要素の取得及び生成
    const imageInputsWrap = document.querySelector('.IdeaFromImageInputsWrap')
    const newImageInputWrap = document.createElement('div')
    const newImageInput = document.createElement('input')
    const newImageLabel = document.createElement('label')

    const nextDataIndex = Number(dataIndex) + 1

    // 生成するWrap, Label, Inputの属性設定
    newImageInputWrap.setAttribute('class', 'IdeaFormImageInputWrap')
    newImageInputWrap.setAttribute('data-index', nextDataIndex)

    newImageLabel.setAttribute('for', `idea_images[${nextDataIndex}]`)
    newImageLabel.setAttribute('data-index', nextDataIndex)
    newImageLabel.setAttribute('class', 'IdeaFormImageLabel')
    newImageLabel.innerHTML = "画像を選択する"

    newImageInput.setAttribute('name', 'idea[images][]')
    newImageInput.setAttribute('data-index', nextDataIndex)
    newImageInput.setAttribute('class', 'IdeaFormImageInput')
    newImageInput.setAttribute('type', 'file')
    newImageInput.setAttribute('id', `idea_images[${nextDataIndex}]`) 

    // 要素の追加
    imageInputsWrap.appendChild(newImageInputWrap)
    newImageInputWrap.appendChild(newImageInput)
    newImageInputWrap.appendChild(newImageLabel)

    // 追加したinputでもchangedImageInputが発火するよう設定
    newImageInput.addEventListener('change', changedImageInput)
  }

  // 画像を生成
  const buildImage = (dataIndex, blob) => {
    const previewImage = document.createElement('img')
    previewImage.setAttribute('src', blob)
    previewImage.setAttribute('class', 'IdeaFormImage')
    previewImage.setAttribute('data-index', dataIndex)
    previews.appendChild(previewImage)
    previews.removeAttribute('type', 'hidden')
  }

  // 画像を削除
  const deleteImage = (dataIndex) => {
    const deleteImagePreview = document.querySelector(`.IdeaFormImage[data-index="${dataIndex}"]`)
    deleteImagePreview.remove()
    const deleteImageInputWrap = document.querySelector(`.IdeaFormImageInputWrap[data-index="${dataIndex}"]`)
    deleteImageInputWrap.remove()

    const imageCount = document.querySelectorAll('.IdeaFormImageInput').length
    if (imageCount == imagesLimit -1) buildImageForm(dataIndex)
  }

  // 画像のinputに変化があった際に行われる処理まとめ
  const changedImageInput = (e) => {
    const dataIndex = e.target.getAttribute('data-index')
    const file = e.target.files[0]

    // 画像を選択しなかった場合、画像とinputを削除し、以降のbuildを行わず処理を終了する
    if (!file) {
      deleteImage(dataIndex)
      return null
    }

    const blob = window.URL.createObjectURL(file)

    // 既にImage添付されているinputを操作した時、画像を差し替え、以降のbuildを行わず処理を終了する
    const alreadyPreview = document.querySelector(`.IdeaFormImage[data-index="${dataIndex}"]`)
    if (alreadyPreview) {
      alreadyPreview.setAttribute('src', blob)
      return null
    }

    // 画像をbuildする
    buildImage(dataIndex, blob)

    // imagesLimit以内であれば、inputをbuildする
    const imageCount = document.querySelectorAll('.IdeaFormImageInput').length
    if (imageCount < imagesLimit) buildImageForm(dataIndex)
  }

  // 初めて画像のinputに変化があった際にchangedImageInputを呼び出す
  const ImageInput = document.querySelector('input[type="file"][name="idea[images][]"][data-index="0"]')
  ImageInput.addEventListener('change', changedImageInput)
}

window.addEventListener('load', ideaImagePreviews)