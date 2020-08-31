using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.UIElements;

[RequireComponent(typeof(Rigidbody2D))]
public class Player : MonoBehaviour
{
    private float forwardMovementSpeed = 7f;
    private float gravity;
    private float jetpackForce = 25f;
    private Rigidbody2D rbController;
    private float axisX = 1;
    private float axisY;
    private Vector3 direction;

    public bool isAlive = true;
    public ParticleSystem thruster;
    public GameObject explosion;
    private int score = 0;
    public LoadSaveSystem loadSaveSystem;
    private float distanceTraveled = 0f;
    public int coinsRecolected = 0;
    private string alienName;
    InputController playerInput;
    public Transform thrusterPosition;
    private AudioSource thrusterAudio;
    private AudioSource explosionAudio;


    public int GetScore()
    {
        return score;
    }

    public void SetScore(int newScore)
    {
        score = newScore;
    }

    public float GetDistanceTraveled()
    {
        return distanceTraveled;
    }

    public void SetAlienName(string name)
    {
        alienName = name;
    }

    private void ConfigComponentsByAvatar()
    {
        alienName = MenuController.Instance.GetAvatarSelected();
        GameObject playerGO = this.gameObject;
        if (alienName == "UFO_player" || alienName == "UFO_player 2")
        {
            //COLLIDER
            CircleCollider2D playerCollision = playerGO.GetComponent<CircleCollider2D>();
            playerCollision.radius = 0.47f;
            playerCollision.offset = new Vector2(0.01f, 0.07f);
        }
        if (alienName == "UFO_player 3")
        {
            //ROTATION
            Quaternion rot = thruster.transform.rotation;
            rot.z = -80f;
            thruster.transform.Rotate(rot.x, rot.y, rot.z);

            Quaternion playerRot = playerGO.transform.rotation;
            playerRot.z = 16.5f;
            playerGO.transform.Rotate(playerRot.x, playerRot.y, playerRot.z);

            //COLLIDER
            CircleCollider2D playerCollision = playerGO.GetComponent<CircleCollider2D>();
            playerCollision.radius = 0.33f;
            playerCollision.offset = new Vector2(0, 0.06f);

            //THRUSTER
            thruster.transform.position = thrusterPosition.position;
            ParticleSystem.ShapeModule shapeModule = thruster.shape;
            float radius = shapeModule.radius;
            radius = 0.02f;
            shapeModule.radius = radius;

            return;
        }
        if (alienName == "UFO_player 4")
        {
            //COLLIDER
            CircleCollider2D playerCollision = playerGO.GetComponent<CircleCollider2D>();
            playerCollision.radius = 0.28f;
            playerCollision.offset = new Vector2(-0.04f, 0.04f);
        }
        if (alienName == "UFO_player 5")
        {
            //COLLIDER
            CircleCollider2D playerCollision = playerGO.GetComponent<CircleCollider2D>();
            playerCollision.radius = 0.38f;
            playerCollision.offset = new Vector2(0.009f, 0.006f);
        }
    }

    private void Movement()
    {
        Vector2 vectorVelocity = rbController.velocity;
        vectorVelocity.x = forwardMovementSpeed;
        rbController.velocity = vectorVelocity;
    }

    private void Impulse()
    {
        if (Input.GetKey(KeyCode.I))
        {
            rbController.AddForce(new Vector2(0, jetpackForce));
            if (!thruster.isEmitting)
            {
                thruster.Play();
                if (!AudioManager.Instance.isMute)
                {
                    thrusterAudio.Play();
                }
            }
        }
        else
        {
            if (thruster.isEmitting)
            {
                thruster.Stop();
                thrusterAudio.Stop();
            }
        }
        /*
        
        if (playerInput.GetInput())
        {
            rbController.AddForce(Vector2.up * jetpackForce);
            if (!thruster.isEmitting)
            {
                thruster.Play();
                if (!AudioManager.Instance.isMute)
                {
                    thrusterAudio.Play();
                }
            }
        }
        else
        {
            if (thruster.isEmitting)
            {
                thruster.Stop();
                thrusterAudio.Stop();
            }
        }*/
    }

    public void SaveGame()
    {
        loadSaveSystem.SaveStats(score, coinsRecolected);
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.tag == "Coin")
        {
            collision.gameObject.SetActive(false);
            coinsRecolected++;
        }
        if (collision.tag == "Obstacle")
        {
            SaveGame();
            thruster.gameObject.SetActive(false);
            if (!AudioManager.Instance.isMute)
            {
                explosionAudio.loop = false;
                explosionAudio.Play();
            }
            
        }
    }

    private void UpdateDistance()
    {
        distanceTraveled = this.transform.position.x;
        distanceTraveled *= 10;
        score = (int)distanceTraveled;
    }

    private void Awake()
    {
        rbController = this.GetComponent<Rigidbody2D>();
        loadSaveSystem = MenuController.Instance.GetPlayerStats();
        if (loadSaveSystem == null)
        {
            Debug.Log("NULOOOO");
        }
        explosion.SetActive(false);
        thrusterAudio = AudioManager.Instance._sfx[0];
        explosionAudio = AudioManager.Instance._sfx[1];
    }

    private void Start()
    {
        playerInput = GetComponent<InputController>();
        ConfigComponentsByAvatar();
    }

    private void FixedUpdate()
    {
        if (isAlive)
        {
            UpdateDistance();
            Movement();
            Impulse();
        }
        else
        {
            thrusterAudio.Stop();
        }
        
    }
}
