using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using UnityEngine;
using UnityEngine.UI;


public class SpriteObj : MonoBehaviour
{
    [SerializeField] string spriteToLoad;
    SpriteAtlasUser atlas;
    SpriteRenderer mySpriteRenderer;
    Image myImage;
    public bool isUI;

    private void Awake()
    {
        if (isUI)
        {
            myImage = GetComponent<Image>();
        }
        else
        {
            mySpriteRenderer = GetComponent<SpriteRenderer>();
        }
    }

    private void Start()
    {
        atlas = FindObjectOfType<SpriteAtlasUser>();
        if (isUI)
        {
            myImage.sprite = atlas.RequestSprite(spriteToLoad);
        }
        else
        {
            mySpriteRenderer.sprite = atlas.RequestSprite(spriteToLoad);
        }
        if (this.gameObject.tag == "Player")
        {
            spriteToLoad = LevelController.Instance.Setplayer();
            mySpriteRenderer.sprite = atlas.RequestSprite(spriteToLoad);
        }
    }

    public void ChangeSprite(string newSpriteToLoad)
    {
        spriteToLoad = newSpriteToLoad;
        atlas = FindObjectOfType<SpriteAtlasUser>();
        myImage = GetComponent<Image>();
        if (myImage != null)
        {
            myImage.sprite = atlas.RequestSprite(newSpriteToLoad);
        }
        
    }
}
