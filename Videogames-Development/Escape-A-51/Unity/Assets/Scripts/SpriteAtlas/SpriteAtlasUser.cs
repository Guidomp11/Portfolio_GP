using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using UnityEngine;
using UnityEngine.U2D;

public class SpriteAtlasUser : MonoBehaviour
{
    [SerializeField] SpriteAtlas myAtlas;
    

    public Sprite RequestSprite(string spriteName)
    {
        return myAtlas.GetSprite(spriteName);
    }
}
