using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Coin : MonoBehaviour
{
    float turnSpeed = 130f;
    void Update()
    {
        transform.Rotate(Vector2.down, turnSpeed * Time.deltaTime);
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
    }
}
