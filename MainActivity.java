public class MainActivity extends AppCompatActivity {

    private EditText messageEditText;
    private Button sendButton;
    private TextView responseTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        messageEditText = findViewById(R.id.messageEditText);
        sendButton = findViewById(R.id.sendButton);
        responseTextView = findViewById(R.id.responseTextView);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://") 
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        ChatGptApi api = retrofit.create(ChatGptApi.class);

        sendButton.setOnClickListener(v -> {
            String message = messageEditText.getText().toString();
            if (!message.isEmpty()) {
                ChatGptRequest request = new ChatGptRequest(message);
                api.getChatResponse(request).enqueue(new Callback<ChatGptResponse>() {
                    @Override
                    public void onResponse(Call<ChatGptResponse> call, Response<ChatGptResponse> response) {
                        if (response.isSuccessful()) {
                            responseTextView.setText(response.body().getResponse());
                        }
                    }

                    @Override
                    public void onFailure(Call<ChatGptResponse> call, Throwable t) {
                        responseTextView.setText("Failed to get response");
                    }
                });
            }
        });
    }
}
