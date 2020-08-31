using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.U2D;

public class SpriteAtlasObstacle : MonoBehaviour
{
    [SerializeField] SpriteAtlas myAtlas;


    public Sprite RequestSprite(string spriteName)
    {
        return myAtlas.GetSprite(spriteName);
    }
}
