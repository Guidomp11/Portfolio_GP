using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Image))]
public class SpriteObj : MonoBehaviour
{
    [SerializeField] string spriteToLoad;
    SpriteAtlasUser atlas;
    Image myImage;

    private void Awake()
    {
        myImage = GetComponent<Image>();
    }

    private void Start()
    {
        atlas = FindObjectOfType<SpriteAtlasUser>();
        myImage.sprite = atlas.RequestSprite(spriteToLoad);
    }
}
